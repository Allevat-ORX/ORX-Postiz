import {
  AuthTokenDetails,
  PostDetails,
  PostResponse,
  SocialProvider,
} from '@gitroom/nestjs-libraries/integrations/social/social.integrations.interface';
import { makeId } from '@gitroom/nestjs-libraries/services/make.is';
import { SocialAbstract } from '@gitroom/nestjs-libraries/integrations/social.abstract';
import { Integration } from '@prisma/client';
import { FacebookGroupsSettingsDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/facebook.groups.dto';

export class FacebookGroupsProvider
  extends SocialAbstract
  implements SocialProvider
{
  identifier = 'facebook-groups';
  name = 'Facebook Groups';
  isBetweenSteps = false;
  scopes = [] as string[];
  editor = 'normal' as const;
  dto = FacebookGroupsSettingsDto;

  maxLength() {
    return 10000;
  }

  async refreshToken(refreshToken: string): Promise<AuthTokenDetails> {
    return {
      refreshToken: '',
      expiresIn: 31536000,
      accessToken: 'arturo-silva-internal-token',
      id: '61594919884581',
      name: 'Arturo Silva (Grupos FB)',
      picture: '/icons/platforms/facebook-groups.png',
      username: 'arturo.silva.orx',
    };
  }

  async generateAuthUrl() {
    return {
      url: (process.env.FRONTEND_URL || '') + '/integrations/social/facebook-groups',
      codeVerifier: 'verifier',
      state: 'state',
    };
  }

  async authenticate(params: {
    code: string;
    codeVerifier: string;
    refresh?: string;
  }): Promise<AuthTokenDetails> {
    return {
      id: '61594919884581',
      name: 'Arturo Silva (Grupos FB)',
      accessToken: 'arturo-silva-internal-token',
      refreshToken: '',
      expiresIn: 31536000,
      picture: '/icons/platforms/facebook-groups.png',
      username: 'arturo.silva.orx',
    };
  }

  async post(
    id: string,
    accessToken: string,
    postDetails: PostDetails<FacebookGroupsSettingsDto>[],
    integration: Integration
  ): Promise<PostResponse[]> {
    const [firstPost] = postDetails;
    const selectedGroups = firstPost.settings?.selected_groups || [];

    // Despacho interno al microservicio de Playwright en server2026
    try {
      await fetch('http://127.0.0.1:8099/api/publish-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: firstPost.id,
          message: firstPost.message,
          media: firstPost.media?.map((m) => m.path) || [],
          selected_groups: selectedGroups,
          integrationId: integration.id,
        }),
      });
    } catch (err) {
      console.error('[FacebookGroupsProvider] Error enviando al worker:', err);
    }

    const postId = makeId(12);
    const releaseURL =
      selectedGroups.length > 0
        ? selectedGroups[0]
        : 'https://www.facebook.com/groups';

    return [
      {
        id: firstPost.id,
        postId,
        releaseURL,
        status: 'success',
      },
    ];
  }
}
