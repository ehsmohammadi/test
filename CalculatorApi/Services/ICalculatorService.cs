using CalculatorApi.Models;

namespace CalculatorApi.Services;

public interface ICalculatorService
{
    // Basic arithmetic
    CalculatorResult Add(double a, double b);
    CalculatorResult Subtract(double a, double b);
    CalculatorResult Multiply(double a, double b);
    CalculatorResult Divide(double a, double b);
    CalculatorResult Modulo(double a, double b);
    CalculatorResult Power(double @base, double exponent);

    // Unary operations
    CalculatorResult Sqrt(double x);
    CalculatorResult Square(double x);
    CalculatorResult Abs(double x);
    CalculatorResult Reciprocal(double x);
    CalculatorResult Negate(double x);
    CalculatorResult Percent(double x);

    // Logarithms
    CalculatorResult Log10(double x);
    CalculatorResult Ln(double x);
    CalculatorResult LogBase(double x, double @base);

    // Trigonometry
    CalculatorResult Sin(double x, AngleMode mode);
    CalculatorResult Cos(double x, AngleMode mode);
    CalculatorResult Tan(double x, AngleMode mode);
    CalculatorResult Asin(double x, AngleMode mode);
    CalculatorResult Acos(double x, AngleMode mode);
    CalculatorResult Atan(double x, AngleMode mode);
}
