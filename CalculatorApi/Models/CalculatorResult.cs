namespace CalculatorApi.Models;

public record CalculatorResult(bool Success, double? Value = null, string? Error = null)
{
    public static CalculatorResult Ok(double value) => new(true, Value: value);
    public static CalculatorResult Fail(string error) => new(false, Error: error);
}
