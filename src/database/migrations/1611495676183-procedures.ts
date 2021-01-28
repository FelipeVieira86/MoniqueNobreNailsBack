import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class procedures1611495676183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'procedures',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          generationStrategy: 'increment',
        },
        {
          name: 'day',
          type: 'varchar',
        },
        {
          name: 'type',
          type: 'varchar',
        },
        {
          name: 'value',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'method',
          type: 'varchar',
        },
        {
          name: 'client_id',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          name: 'clientProcedures',
          columnNames: ['client_id'],
          referencedTableName: 'clients',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('procedures');
  }
}
