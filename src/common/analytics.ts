// in order to track how the feature is being used - we'll mock a simple analytics function
// e.g. Google Analytics / Adobe Analytics
const trackAction = (category: string, action: string, label: string) => console.log(`${category} - ${action} - ${label}`);

export default trackAction;
