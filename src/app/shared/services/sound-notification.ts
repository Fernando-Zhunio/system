
import { Injectable } from "@angular/core";
// import { Store } from "@ngrx/store";
import { Preferences } from "../../class/fast-data";
// import { take } from "rxjs/operators";
// import { Preferences } from "../../core/interfaces/preferences";
// import { selectPreference } from "../../redux/state/state.selectors";
import { StorageService } from "../../services/storage.service";
// import { Sound } from "../interfaces/sound";
import { KeysLocalStorage } from "../class/keys-local-storage";

@Injectable({ providedIn: 'root' })
export class SoundNotification {
    // private sound: HTMLAudioElement;
    // private static instance: SoundNotification;
    volume: number = 1;
    constructor() {
    }

    sound(path: string | null = null): HTMLAudioElement {
        path = path || '/assets/audio/new_message.mp3';
        const sound = new Audio(path);
        sound.volume = this.volume;
        return sound;
    }

    initVolume(_st: StorageService) {
        let volume = _st.getItemLocalStorage(KeysLocalStorage.VOLUME);
        console.log({ volume });
        if (!volume) {
            _st.setItemLocalStorage(KeysLocalStorage.VOLUME, '100');
            volume = '100';
        }
        volume = Math.min(Math.max(volume, 1), 100);
        this.volume = parseInt(volume) / 100;
    }

    setVolumen(_st: StorageService, volume: number) {
        _st.setItemLocalStorage(KeysLocalStorage.VOLUME, volume.toString());
        volume = Math.min(Math.max(volume, 1), 100);
        this.volume = volume / 100;
        this.sound().play();
    }

    getVolume() {
        return this.volume;
    }

    play() {
        console.log(Preferences.getInstance().get())
        Preferences.getInstance().get().general_notification_sound === 'on' &&
            this.sound().play();
    }
}