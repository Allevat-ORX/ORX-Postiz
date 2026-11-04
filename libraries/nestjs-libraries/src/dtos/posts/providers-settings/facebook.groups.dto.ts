import { IsArray, IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class FacebookGroupsSettingsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @JSONSchema({
    description: 'Lista de URLs o IDs de grupos de Facebook seleccionados',
  })
  selected_groups?: string[];
}
