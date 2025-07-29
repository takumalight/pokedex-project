type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val
        });
    };

    get<T>(key:string): T | undefined {
        return this.#cache.get(key)?.val;
    };

    #reap(): void {
        for (const [key, entry] of this.#cache.entries()){
            if (Date.now() - this.#interval >= entry.createdAt) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
