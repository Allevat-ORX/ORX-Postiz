'use client';

import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { FC } from 'react';
import { FacebookGroupsSettingsDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/facebook.groups.dto';
import { FacebookGroupsSelect } from '@gitroom/frontend/components/new-launch/providers/facebook-groups/facebook.groups.select';

const FacebookGroupsComponent: FC = () => {
  return <FacebookGroupsSelect />;
};

export default withProvider({
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: FacebookGroupsComponent,
  CustomPreviewComponent: undefined,
  dto: FacebookGroupsSettingsDto,
  maximumCharacters: 10000,
});
