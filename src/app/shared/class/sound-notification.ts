
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { Preferences } from "../../core/interfaces/preferences";
import { selectPreference } from "../../redux/state/state.selectors";
import { StorageService } from "../../services/storage.service";
import { Sound } from "../interfaces/sound";
import { KeysLocalStorage } from "./keys-local-storage";

@Injectable({providedIn: 'root'})
export class SoundNotification implements Sound {
    private sound: HTMLAudioElement;
    // private static instance: SoundNotification;

    private constructor(private store: Store) {
        this.sound = new Audio('/assets/audio/new_message.mp3');
    }

    initVolume(_st: StorageService) {
        let volume = _st.getItemLocalStorage(KeysLocalStorage.VOLUME);
        console.log({volume});
        if (!volume) {
            _st.setItemLocalStorage(KeysLocalStorage.VOLUME, '100');
            volume = '100';
        }
        volume = Math.min(Math.max(volume, 1), 100);
        this.sound.volume = parseInt(volume) / 100;
    }

    setVolumen(_st: StorageService, volume: number) {
        _st.setItemLocalStorage(KeysLocalStorage.VOLUME, volume.toString());
        volume = Math.min(Math.max(volume, 1), 100);
        this.sound.volume = volume / 100;
        this.sound.play();
    }

    // public static getInstance(): SoundNotification {
    //     if (!SoundNotification.instance) {
    //         SoundNotification.instance = new SoundNotification();
    //     }
    //     return SoundNotification.instance;
    // }

    path(path: string) {
        this.sound.src = path;
    }

    getVolume() {
        return this.sound.volume;
    }

    play() {
        let isSound = false;
        this.store.select(selectPreference)
        .pipe(take(1)).subscribe((res: Preferences) => {
            console.log(res);
            const isActive = res?.general_notification_sound || 'true';
            isSound = isActive === 'on';
        });
        console.log({isSound});
        if (isSound) {
            this.sound.play();
        }
    }

    stop() {
        console.log(this.sound);
        this.sound.pause();
    }
}