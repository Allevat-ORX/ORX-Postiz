import { AgentToolInterface } from '@gitroom/nestjs-libraries/chat/agent.tool.interface';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { PostsService } from '@gitroom/nestjs-libraries/database/prisma/posts/posts.service';
import { checkAuth } from '@gitroom/nestjs-libraries/chat/auth.context';

@Injectable()
export class PostChangeDateTool implements AgentToolInterface {
  constructor(private _postsService: PostsService) {}
  name = 'postChangeDateTool';

  run() {
    return createTool({
      id: 'postChangeDateTool',
      mcp: {
        annotations: {
          title: 'Reschedule or Change Date of an Existing Post',
          readOnlyHint: false,
          destructiveHint: true,
          idempotentHint: false,
          openWorldHint: false,
        },
      },
      description: `
Change the scheduled or draft publication date and time of an existing post that was NOT published yet.
Pass the "id" of the post (find it first with postsListTool) and the "date" in UTC format (e.g. "YYYY-MM-DDTHH:mm:ssZ" or "YYYY-MM-DD HH:mm:ss").
If the post belongs to a multi-channel group, all linked posts in that same group will have their date updated together so they stay in sync.
Do NOT use integrationSchedulePostTool when the user asks to move, reschedule, or change the date of an existing post - always use this tool.
`,
      inputSchema: z.object({
        id: z.string().describe('The id of the post to change its date'),
        date: z.string().describe('The new date and time for the post in UTC (e.g. 2026-10-22T17:00:00Z)'),
      }),
      outputSchema: z.object({
        output: z
          .object({
            success: z.boolean(),
            updatedPosts: z.array(z.string()),
            publishDate: z.string(),
          })
          .or(z.object({ errors: z.string() })),
      }),
      execute: async (inputData, context) => {
        checkAuth(inputData, context);
        const organizationId = JSON.parse(
          (context?.requestContext as any)?.get('organization') as string
        ).id;

        try {
          const post = await this._postsService.getPostById(inputData.id, organizationId);
          if (!post) {
            return { output: { errors: 'Post not found' } };
          }

          const updated: string[] = [];
          if (post.group) {
            const groupData = await this._postsService.getPostsByGroup(organizationId, post.group);
            const groupPosts = (groupData as any).posts || [post];
            for (const p of groupPosts) {
              await this._postsService.changeDate(organizationId, p.id, inputData.date, 'update');
              updated.push(p.id);
            }
          } else {
            await this._postsService.changeDate(organizationId, post.id, inputData.date, 'update');
            updated.push(post.id);
          }

          return {
            output: {
              success: true,
              updatedPosts: updated,
              publishDate: inputData.date,
            },
          };
        } catch (err: any) {
          return {
            output: {
              errors: err?.message || 'Failed to change the post date',
            },
          };
        }
      },
    });
  }
}
