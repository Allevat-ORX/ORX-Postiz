import { IsArray, IsDefined, IsString, ArrayMinSize } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class FacebookGroupsSettingsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsDefined()
  @JSONSchema({
    description: 'Lista de URLs o IDs de grupos de Facebook seleccionados',
  })
  selected_groups: string[];
}
