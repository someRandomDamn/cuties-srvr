import {MigrationInterface, QueryRunner} from "typeorm";

export class removeUnused1645121316981 implements MigrationInterface {
    name = 'removeUnused1645121316981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`block\` DROP COLUMN \`logs_bloom\``);
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD \`logs_bloom\` varchar(255) NOT NULL`);
    }

}
