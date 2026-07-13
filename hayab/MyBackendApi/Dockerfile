# Stage 1: Build & Publish the .NET application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the C# project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy all source files and publish release build
COPY . ./
RUN dotnet publish -c Release -o /app/out

# Stage 2: Serve the application using the ASP.NET Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expose port 80 and set the launch URL
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Starts the C# API (Note: Replace hayab.dll with Haya.dll if your project's .csproj is named Haya)
ENTRYPOINT ["dotnet", "hayab.dll"]