# Stage 1: Build the React Frontend (hayadash)
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY ./hayadash/package*.json ./
RUN npm install
COPY ./hayadash ./
RUN npm run build

# Stage 2: Build the .NET Backend (hayab/MyBackendApi)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /app/backend
# Copy the csproj and restore dependencies
COPY ./hayab/MyBackendApi/*.csproj ./
RUN dotnet restore
# Copy the rest of the backend files and publish
COPY ./hayab/MyBackendApi ./
RUN dotnet publish -c Release -o out

# Stage 3: Runtime Container
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
# Copy published C# binaries
COPY --from=backend-build /app/backend/out .
# Copy compiled React dashboard files to .NET static files folder (wwwroot)
# Note: If you are using Create-React-App instead of Vite, change /dist to /build below
COPY --from=frontend-build /app/frontend/dist ./wwwroot

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyBackendApi.dll"]