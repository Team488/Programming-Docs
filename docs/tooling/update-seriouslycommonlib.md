# Updating SeriouslyCommonLib

[SeriouslyCommonLib](https://github.com/Team488/SeriouslyCommonLib) (SCL) is the shared library all our robot code builds on. Updating a robot project to a newer SCL means bumping one version number and opening a pull request.

::: info
SCL used to be a **git submodule** inside each robot project, and updating it meant running git commands inside that submodule folder. That is no longer how it works -- SCL is now a published Maven artifact, and the robot projects pin a version of it. If you find older instructions that tell you to `cd SeriouslyCommonLib`, they are out of date.
:::

## Bump the version

1. Make a branch off `main` -- in GitHub Desktop, **Current branch** then **New branch**, named something like `update-scl`.
2. Find the latest published version on the [XBot Azure Artifacts feed](https://dev.azure.com/Team488/Team%20488%20Builds/_artifacts/feed/XBot).
3. Open `build.gradle` and update the version:

   ```groovy
   // When in doubt, use the latest version from
   // https://dev.azure.com/Team488/Team%20488%20Builds/_artifacts/feed/XBot
   def SeriouslyCommonLibVersion = '20260405.5'
   ```

   One constant feeds both the `implementation` and `customAspectJ` dependencies, so this is the only line to change.

4. Build the project to pull the new version down and confirm it still compiles.
5. Run the tests. SCL changes can alter behavior your robot code depends on, so a green build is not enough on its own.
6. Commit, push, and open a pull request.

## Testing unreleased SCL changes

If you need to try SCL changes that have not been published yet, the robot projects support building against a local clone instead of the Maven artifact.

1. Clone SeriouslyCommonLib **next to** the robot project, so the two sit side by side as `../SeriouslyCommonLib`.
2. Build with the flag:

   ```bash
   ./gradlew build -DuseLocalCommonLib=true
   ```

   or set the environment variable `USE_LOCAL_COMMON_LIB=true`.

Gradle prints which source it used, so you can confirm which one you got:

```
✓ Using local SeriouslyCommonLib from ../SeriouslyCommonLib for development
→ Using SeriouslyCommonLib from Maven repository
```

Leave the flag off for normal work, and never commit a change that depends on an unpublished local build -- the version in `build.gradle` is what everyone else and the build server will use.
