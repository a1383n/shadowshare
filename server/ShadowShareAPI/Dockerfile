FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy the sln and .csproj files and restore dependencies
COPY *.sln .
COPY ShadowShareAPI/ShadowShareAPI.csproj ShadowShareAPI/
COPY Data/Data.csproj Data/
COPY Entities/Entities.csproj Entities/
COPY Services/Services.csproj Services/

# Restore dependencies
RUN dotnet restore ShadowShareAPI/ShadowShareAPI.csproj

# Copy source code
COPY ShadowShareAPI/* ShadowShareAPI/
COPY Data/* Data/
COPY Entities/* Entities/
COPY Services/* Services/

# Build project
WORKDIR "/src/ShadowShareAPI"
RUN dotnet build "ShadowShareAPI.csproj" -c Release -o /app/build

# Publish project
FROM build AS publish
RUN dotnet publish "ShadowShareAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Deploy
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ShadowShareAPI.dll"]