import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Diary } from './Diary';

@Entity('diary_sync_failed')
export class DiarySyncFailed {
    @PrimaryColumn({ type: 'uuid' })
    public id: string;

    @Column({ name: 'diary_id' })
    public diaryId: string;

    @Column({ type: 'varchar' })
    public action: 'CREATE' | 'UPDATE';

    @Column({ name: 'last_error', type: 'text' })
    public lastError: string;

    @Column({ name: 'retried_time', default: 0 })
    public retriedTime: number;

    @CreateDateColumn({ name: 'created_at', default: 'now()' })
    public createdAt: string;
    @UpdateDateColumn({ name: 'updated_at', default: 'now()' })
    public updateAt: string;
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    public deletedAt: string;

    @ManyToOne(() => Diary)
    @JoinColumn({ name: 'diary_id' })
    public diary: Diary;
}
