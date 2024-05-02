package com.videoplayer

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.app.PictureInPictureParams
import android.os.Build
import android.util.Rational

class PipModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val aspectRatio: Rational = Rational(5, 4)

    override fun getName(): String {
        return "PipModule"
    }

    @ReactMethod
    fun enterPipMode() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val params = PictureInPictureParams.Builder()
                    .setAspectRatio(aspectRatio)
                    .build()
            currentActivity?.enterPictureInPictureMode(params)
        }
    }
}
