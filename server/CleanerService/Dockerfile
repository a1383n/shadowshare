FROM mcr.microsoft.com/dotnet/runtime:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy the .csproj files
COPY CleanerService/CleanerService.csproj CleanerService/CleanerService.csproj

# Restore dependencies
RUN dotnet restore CleanerService/CleanerService.csproj

# Copy source code
COPY CleanerService/* CleanerService

# Build project
WORKDIR "/src/CleanerService"
RUN dotnet build "CleanerService.csproj" -c Release -o /app/build

# Publish project
FROM build AS publish
RUN dotnet publish "CleanerService.csproj" -c Release -o /app/publish

# Deploy
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["./CleanerService"]