import {MigrationInterface, QueryRunner} from "typeorm";

export class update1645121557499 implements MigrationInterface {
    name = 'update1645121557499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`input\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`input\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`input\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`input\` varchar(255) NOT NULL`);
    }

}
