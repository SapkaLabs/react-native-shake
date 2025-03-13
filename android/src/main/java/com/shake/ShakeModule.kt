package com.shake
import android.content.Context
import android.hardware.SensorManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ShakeModule.NAME)
class ShakeModule(reactContext: ReactApplicationContext) :
  NativeShakeSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  private lateinit var shakeDetector: ShakeDetector
  override fun initialize() {
    super.initialize()
    shakeDetector = ShakeDetector({
      emitOnShake();
    })

    shakeDetector.start(
      reactApplicationContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    )
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  override fun invalidate() {
    super.invalidate()
    shakeDetector.stop()
  }

  override fun emitShakeEvent() {
    emitOnShake();
  }

  companion object {
    const val NAME = "Shake"
  }
}
