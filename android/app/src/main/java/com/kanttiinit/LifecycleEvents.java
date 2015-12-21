package com.kanttiinit;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

public class LifecycleEvents implements ReactPackage {

    private Activity activity;

    public LifecycleEvents(Activity activity) {
        this.activity = activity;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new EventModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> modules = new ArrayList<>();
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        List<Class<? extends JavaScriptModule>> modules = new ArrayList<>();
        return modules;
    }

    private class EventModule extends ReactContextBaseJavaModule {

        private ReactContext reactContext;

        public EventModule(final ReactApplicationContext reactContext) {
            super(reactContext);

            this.reactContext = reactContext;

            activity.getApplication().registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
                @Override
                public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
                    sendEvent("create");
                }

                @Override
                public void onActivityStarted(Activity activity) {
                    sendEvent("start");
                }

                @Override
                public void onActivityResumed(Activity activity) {
                    sendEvent("resume");
                }

                @Override
                public void onActivityPaused(Activity activity) {
                    sendEvent("pause");
                }

                @Override
                public void onActivityStopped(Activity activity) {
                    sendEvent("stop");
                }

                @Override
                public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
                }

                @Override
                public void onActivityDestroyed(Activity activity) {
                    sendEvent("destroy");
                }
            });
        }

        private void sendEvent(String name) {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(name, null);
        }

        @Override
        public String getName() {
            return "LifecycleEvents";
        }
    }
}