// Shown by <Suspense> while a lazy route chunk downloads. A thin top bar,
// not a spinner, so it reads as "loading" without stealing focus.
export default function RouteFallback() {
  return (
    <div className="route-fallback container" aria-hidden="true">
      <span className="route-fallback__bar" />
    </div>
  );
}
