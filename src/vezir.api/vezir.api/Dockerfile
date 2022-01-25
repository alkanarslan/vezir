FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["vezir.api.csproj", "./"]
RUN dotnet restore "vezir.api.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "vezir.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "vezir.api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "vezir.api.dll"]
