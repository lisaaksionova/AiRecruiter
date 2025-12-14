FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5087
EXPOSE 5088

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AiRecruiter.API/AiRecruiter.API.csproj", "AiRecruiter.API/"]
COPY ["AiRecruiter.BLL/AiRecruiter.BLL.csproj", "AiRecruiter.BLL/"]
COPY ["AiRecruiter.DAL/AiRecruiter.DAL.csproj", "AiRecruiter.DAL/"]
RUN dotnet restore "AiRecruiter.API/AiRecruiter.API.csproj"
COPY . .

WORKDIR "/src/AiRecruiter.API"
RUN dotnet build "AiRecruiter.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "AiRecruiter.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AiRecruiter.API.dll"]