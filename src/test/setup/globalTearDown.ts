/**
 * Global teardown for the tests
 */
const globalTearDown = async () => {
    const instance = (global as any).__MONGOINSTANCE__;
    if (instance) {
        await instance.stop();
    }
};

export default globalTearDown;
