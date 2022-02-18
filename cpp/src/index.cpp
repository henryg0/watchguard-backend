#include <napi.h>
#include <string>
#include "RFModuleReader.h"

Napi::Number getCarbonMonoxide(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  double result = getRFModuleData();
  return Napi::Number::New(env, result);
}

Napi::Number getTemperature(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  double result = getRFModuleData();
  return Napi::Number::New(env, result);
}

Napi::Number getBloodPressure(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  double result = getRFModuleData();
  return Napi::Number::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(
    Napi::String::New(env, "getCarbonMonoxide"),
    Napi::Function::New(env, getCarbonMonoxide)  );
  exports.Set(
    Napi::String::New(env, "getTemperature"),
    Napi::Function::New(env, getTemperature)  );
  exports.Set(
    Napi::String::New(env, "getBloodPressure"),
    Napi::Function::New(env, getBloodPressure)
  );
  return exports;
}

NODE_API_MODULE(greet, Init);