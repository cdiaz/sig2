import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(@Inject('dbconnection') private readonly db) { }

  async getBarrios() {

    let barrios = await this.db.query(
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

    return await barrios.rows[0].row_to_json
  }


  public async getRestaurantes() {
    let result = await this.db.query("SELECT ST_AsGeoJSON(geom), nombre FROM restaurantes");

    const restaurantes = result.rows.map((row) => {
      let geojson = JSON.parse(row.st_asgeojson)
      geojson.properties = { nombre: row.nombre }
      return geojson
    });

    return await restaurantes;
  }

  public async getHoteles() {

    let result = await this.db.query('SELECT ST_AsGeoJSON(geom), nombre FROM "Hoteles"');
    const hoteles = result.rows.map((row) => {
      let geojson = JSON.parse(row.st_asgeojson)
      geojson.properties = { nombre: row.nombre }
      return geojson
    });
    return await hoteles;
  }


}
