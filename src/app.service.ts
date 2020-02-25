import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(@Inject('dbconnection') private readonly db) {}

  async getBarrios() {
    const query = await this.db.query(
    "SELECT\n" +
    "	row_to_json ( fc ) \n" +
    "FROM\n" +
    "	(\n" +
    "	SELECT\n" +
    "		'FeatureCollection' AS TYPE,\n" +
    "		array_to_json (\n" +
    "		ARRAY_AGG ( f )) AS features \n" +
    "	FROM\n" +
    "		(\n" +
    "		SELECT\n" +
    "			'Feature' AS TYPE,\n" +
    "			ST_AsGeoJSON ( lg.geom ) :: json AS geometry,\n" +
    "			row_to_json ((\n" +
    "					ID,\n" +
    "					NOMBRE \n" +
    "				)) AS properties \n" +
    "		FROM\n" +
    "			barrios AS lg \n" +
    "		) AS f \n" +
    "	) AS fc;"
    );
    return await query.rows[0].row_to_json;
  }
}
