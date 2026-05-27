FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apk add --no-cache maven && mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/flight-service-0.0.1-SNAPSHOT.jar flight-service.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "flight-service.jar"]
