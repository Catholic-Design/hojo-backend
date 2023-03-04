import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BookSummaryResponse {
  @ApiProperty()
  @Expose()
  bookSummary: string;
}
