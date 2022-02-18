import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1645120975297 implements MigrationInterface {
    name = 'initial1645120975297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transaction_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`topics\` longtext NOT NULL, \`data\` varchar(255) NOT NULL, \`log_index\` int NOT NULL, \`removed\` tinyint NOT NULL, \`hash_id\` varchar(255) NOT NULL, \`transaction_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hash\` varchar(255) NOT NULL, \`from\` varchar(255) NOT NULL, \`to\` varchar(255) NOT NULL, \`gas\` int NOT NULL, \`gas_price\` varchar(255) NOT NULL, \`cumulative_gas_used\` int NOT NULL, \`gas_used\` int NOT NULL, \`input\` varchar(255) NOT NULL, \`nonce\` int NOT NULL, \`transaction_index\` int NOT NULL, \`value\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`block_id\` int NULL, UNIQUE INDEX \`IDX_de4f0899c41c688529784bc443\` (\`hash\`), INDEX \`IDX_b049396dc49e0e76a5ae7a2455\` (\`transaction_index\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`block\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date_created\` timestamp NOT NULL, \`difficulty\` varchar(255) NOT NULL, \`extra_data\` varchar(255) NOT NULL, \`gas_limit\` int NOT NULL, \`gas_used\` int NOT NULL, \`hash\` varchar(255) NOT NULL, \`logs_bloom\` varchar(255) NOT NULL, \`miner\` varchar(255) NOT NULL, \`mix_hash\` varchar(255) NOT NULL, \`nonce\` varchar(255) NOT NULL, \`block_height\` int NOT NULL, \`parent_hash\` varchar(255) NOT NULL, \`receipts_root\` varchar(255) NOT NULL, \`sha3_uncles\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`state_root\` varchar(255) NOT NULL, \`total_difficulty\` varchar(255) NOT NULL, \`transactions_list\` longtext NULL, \`transactions_root\` varchar(255) NOT NULL, \`uncles\` longtext NULL, INDEX \`IDX_875fd62fd8ce813e2b823d904e\` (\`date_created\`), UNIQUE INDEX \`IDX_f8fba63d7965bfee9f304c487a\` (\`hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` ADD CONSTRAINT \`FK_49d260f79289be40ea0f0092813\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transaction\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_c0e1460f3c9eee975fee81002dc\` FOREIGN KEY (\`block_id\`) REFERENCES \`block\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_c0e1460f3c9eee975fee81002dc\``);
        await queryRunner.query(`ALTER TABLE \`transaction_log\` DROP FOREIGN KEY \`FK_49d260f79289be40ea0f0092813\``);
        await queryRunner.query(`DROP INDEX \`IDX_f8fba63d7965bfee9f304c487a\` ON \`block\``);
        await queryRunner.query(`DROP INDEX \`IDX_875fd62fd8ce813e2b823d904e\` ON \`block\``);
        await queryRunner.query(`DROP TABLE \`block\``);
        await queryRunner.query(`DROP INDEX \`IDX_b049396dc49e0e76a5ae7a2455\` ON \`transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_de4f0899c41c688529784bc443\` ON \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transaction_log\``);
    }

}
