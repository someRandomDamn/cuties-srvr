import { ClientOpts } from 'redis';

export class RedisConfig {
  private readonly host: string;
  private readonly port: number;
  private readonly db: string;

  constructor(
    host: string = 'localhost',
    port: number = 6379,
    db: string = '0',
  ) {
    this.host = host;
    this.port = port;
    this.db = db;
  }

  public toClientOpts(): ClientOpts {
    return <ClientOpts>{
      host: this.host,
      port: this.port,
      db: this.db,
    };
  }

  public toUri(): string {
    return `redis://${this.host}:${this.port}/${this.db}`;
  }

  public static fromUri(uri: string): RedisConfig {
    const parsedURL = new URL(uri);

    return new RedisConfig(
      parsedURL.hostname || 'localhost',
      Number(parsedURL.port || 6379),
      (parsedURL.pathname || '/0').substr(1) || '0',
    );
  }
}
