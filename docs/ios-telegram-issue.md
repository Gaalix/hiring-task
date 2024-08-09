# Addressing the iOS Telegram Mini-App Scrolling Issue

## The Official Solution

While researching, I found that Telegram has introduced a built-in method to handle this issue directly. As of July 2024, we can use:

```javascript
// This method allows us to control vertical swipe behavior in Mini-Apps.
window.Telegram.WebApp.enableVerticalSwipes();
```

This method allows us to control vertical swipe behavior in Mini-Apps.

## Implementation

I plan to add this single line of JavaScript to my Mini-App's initialization code:

```javascript
window.addEventListener("load", () => {
  window.Telegram.WebApp.enableVerticalSwipes();
});
```

## Testing

If I implement this, I expect the scrolling to work smoothly without unexpected minimization. However, without actual testing on iOS devices, it's hard to be certain of its effectiveness.
