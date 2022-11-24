import { NgxPermissionsService } from "ngx-permissions";
import { fillUser, Token } from "../../class/fast-data";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { SoundNotification } from "../../shared/services/sound-notification";

export function InitializerAppNovisolutions(_st: StorageService, s_permissions: NgxPermissionsService, _sn: SoundNotification, _sa: AuthService) {
    return () => {
        try {
            const session = _st.getCurrentSessionLocalStorage();
            if (session) {
                _st.setSession(session);
                initializerFastData(_st);
                initializerPermissions(_st, s_permissions);
                initializerSoundNotification(_st, _sn);
            } else {
                notSession(_sa);
            }
        } catch (error) {
            notSession(_sa);
        }
    }
}

function initializerFastData(st: StorageService) {
    Token.getInstance().setToken(st.getCurrentToken())
    fillUser(st.getCurrentUser());
}

function notSession(sa: AuthService) {
    const isAuthPath = window.location.href.includes('authentication');
    if (!isAuthPath) {
        sa.logout();
    }
}

function initializerPermissions(_st: StorageService, s_permissions: NgxPermissionsService) {
    const permissions = _st.getPermissions();
    if (permissions) {
        s_permissions.loadPermissions(permissions);
    }
}

function initializerSoundNotification(_st: StorageService, _sn: SoundNotification) {
    _sn.initVolume(_st);
}
