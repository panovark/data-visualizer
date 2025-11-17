const LoadingState = () => {
  const chartSkeletons = Array.from({ length: 2 });

  return (
    <div className="container mx-auto px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center">
          <div className="h-12 w-12 animate-spin motion-reduce:animate-none rounded-full border-4 border-muted/40 border-t-primary" />
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            Fetching trivia questions…
          </p>
          <p className="text-sm text-muted-foreground">
            Building charts and filters for you.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="mx-auto w-full max-w-3xl space-y-4">
          <div className="h-11 w-3/4 animate-pulse motion-reduce:animate-none rounded-xl bg-muted/60 sm:w-1/2" />
          <div className="h-6 w-full animate-pulse motion-reduce:animate-none rounded-xl bg-muted/50" />
        </div>
        <div className="mx-auto w-full max-w-2xl animate-pulse motion-reduce:animate-none rounded-2xl border border-border/60 bg-muted/30 p-6">
          <div className="h-5 w-40 rounded-lg bg-muted/60" />
          <div className="mt-4 h-10 rounded-lg bg-muted/50" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {chartSkeletons.map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse motion-reduce:animate-none rounded-2xl border border-border/60 bg-muted/30 p-6"
            >
              <div className="h-6 w-40 rounded-lg bg-muted/60" />
              <div className="mt-6 h-full rounded-xl bg-muted/40" />
            </div>
          ))}
        </div>

        <div className="animate-pulse motion-reduce:animate-none rounded-2xl border border-border/60 bg-muted/30 p-6">
          <div className="h-6 w-48 rounded-lg bg-muted/60" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-12 rounded-lg border border-border/40 bg-muted/40"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
