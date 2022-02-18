import {MigrationInterface, QueryRunner} from "typeorm";

export class update1645121594528 implements MigrationInterface {
    name = 'update1645121594528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction_log\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` ADD \`data\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`block\` CHANGE \`date_created\` \`date_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` ADD \`data\` varchar(255) NOT NULL`);
    }

}
