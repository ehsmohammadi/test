using CalculatorApi.Models;

namespace CalculatorApi.Services;

public class CalculatorService : ICalculatorService
{
    // Basic arithmetic
    public CalculatorResult Add(double a, double b) => CalculatorResult.Ok(a + b);
    public CalculatorResult Subtract(double a, double b) => CalculatorResult.Ok(a - b);
    public CalculatorResult Multiply(double a, double b) => CalculatorResult.Ok(a * b);

    public CalculatorResult Divide(double a, double b)
    {
        if (b == 0) return CalculatorResult.Fail("Division by zero is undefined.");
        return CalculatorResult.Ok(a / b);
    }

    public CalculatorResult Modulo(double a, double b)
    {
        if (b == 0) return CalculatorResult.Fail("Modulo by zero is undefined.");
        return CalculatorResult.Ok(a % b);
    }

    public CalculatorResult Power(double @base, double exponent)
    {
        var result = Math.Pow(@base, exponent);
        return Validate(result, "Power operation produced an invalid result.");
    }

    // Unary operations
    public CalculatorResult Sqrt(double x)
    {
        if (x < 0) return CalculatorResult.Fail("Square root of a negative number is undefined in real numbers.");
        return CalculatorResult.Ok(Math.Sqrt(x));
    }

    public CalculatorResult Square(double x) => CalculatorResult.Ok(x * x);
    public CalculatorResult Abs(double x) => CalculatorResult.Ok(Math.Abs(x));
    public CalculatorResult Negate(double x) => CalculatorResult.Ok(-x);
    public CalculatorResult Percent(double x) => CalculatorResult.Ok(x / 100.0);

    public CalculatorResult Reciprocal(double x)
    {
        if (x == 0) return CalculatorResult.Fail("Reciprocal of zero is undefined.");
        return CalculatorResult.Ok(1.0 / x);
    }

    // Logarithms
    public CalculatorResult Log10(double x)
    {
        if (x <= 0) return CalculatorResult.Fail("Logarithm is defined only for positive numbers.");
        return CalculatorResult.Ok(Math.Log10(x));
    }

    public CalculatorResult Ln(double x)
    {
        if (x <= 0) return CalculatorResult.Fail("Natural logarithm is defined only for positive numbers.");
        return CalculatorResult.Ok(Math.Log(x));
    }

    public CalculatorResult LogBase(double x, double @base)
    {
        if (x <= 0) return CalculatorResult.Fail("Logarithm is defined only for positive numbers.");
        if (@base <= 0 || @base == 1) return CalculatorResult.Fail("Logarithm base must be positive and not equal to 1.");
        return CalculatorResult.Ok(Math.Log(x, @base));
    }

    // Trigonometry
    public CalculatorResult Sin(double x, AngleMode mode) =>
        CalculatorResult.Ok(Math.Sin(ToRadians(x, mode)));

    public CalculatorResult Cos(double x, AngleMode mode) =>
        CalculatorResult.Ok(Math.Cos(ToRadians(x, mode)));

    public CalculatorResult Tan(double x, AngleMode mode)
    {
        var result = Math.Tan(ToRadians(x, mode));
        return Validate(result, "Tangent is undefined at this angle.");
    }

    public CalculatorResult Asin(double x, AngleMode mode)
    {
        if (x < -1 || x > 1) return CalculatorResult.Fail("Arcsine input must be in the range [-1, 1].");
        return CalculatorResult.Ok(FromRadians(Math.Asin(x), mode));
    }

    public CalculatorResult Acos(double x, AngleMode mode)
    {
        if (x < -1 || x > 1) return CalculatorResult.Fail("Arccosine input must be in the range [-1, 1].");
        return CalculatorResult.Ok(FromRadians(Math.Acos(x), mode));
    }

    public CalculatorResult Atan(double x, AngleMode mode) =>
        CalculatorResult.Ok(FromRadians(Math.Atan(x), mode));

    // Helpers
    private static double ToRadians(double x, AngleMode mode) =>
        mode == AngleMode.Deg ? x * Math.PI / 180.0 : x;

    private static double FromRadians(double x, AngleMode mode) =>
        mode == AngleMode.Deg ? x * 180.0 / Math.PI : x;

    private static CalculatorResult Validate(double result, string error) =>
        double.IsNaN(result) || double.IsInfinity(result)
            ? CalculatorResult.Fail(error)
            : CalculatorResult.Ok(result);
}
