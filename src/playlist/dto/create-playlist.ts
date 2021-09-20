import { TrackDocument } from '../../track/schemas/track.schema'
export class CreatePlaylistDto {
    readonly name: string;
    readonly tracks?: TrackDocument[];
  
   
  }
  