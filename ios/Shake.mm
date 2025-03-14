#import "Shake.h"
#import "RNShakeImpl.h"
#import "generated/RNShakeSpec/RNShakeSpec.h"


@interface Shake () <RNShakeImplDelegate>
@end

@implementation Shake {
    RNShakeImpl *moduleImpl;
    BOOL hasListeners;
}

RCT_EXPORT_MODULE()

- (instancetype)init {
    self = [super init];
    if (self) {
        moduleImpl = [RNShakeImpl new];
        moduleImpl.delegate = self;
    }
    return self;
}


- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);
    return result;
}

- (void)emitShakeEvent
{
    // This method might be called from JS to manually trigger a shake event
    [self emitOnShake];
}

// Required for events to work
- (NSArray<NSString *> *)supportedEvents
{
    return @[@"onShake"];
}

- (void)handleEventWithName:(NSString * _Nonnull)name {
    //if (hasListeners) {
      [self emitOnShake];
        //[self sendEventWithName:name body:nil];
    // }
}

- (void)startObserving
{
    hasListeners = YES;
}

- (void)stopObserving
{
    hasListeners = NO;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeShakeSpecJSI>(params);
}

@end
