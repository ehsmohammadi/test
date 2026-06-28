namespace CalculatorApi.Models;

public record BinaryRequest(double A, double B);

public record UnaryRequest(double X, AngleMode Mode = AngleMode.Deg);

public record PowerRequest(double Base, double Exponent);

public enum AngleMode { Deg, Rad }
