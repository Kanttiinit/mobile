package com.kanttiinit;

import android.app.Activity;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import android.graphics.Color;
import android.view.WindowManager;
import android.view.Window;

public class Kanttiinit extends Activity implements DefaultHardwareBackBtnHandler {
   @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      Window window = getWindow();
      window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
      window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
      window.setStatusBarColor(Color.parseColor("#00796B"));
   }

   @Override
   protected void onStart() {
      super.onStart();
      // reactAppContext
      //   .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      //   .emit("onStart", null);
   }
}
