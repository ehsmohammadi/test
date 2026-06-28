using CalculatorApi.Models;
using CalculatorApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CalculatorApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CalculatorController(ICalculatorService calculator) : ControllerBase
{
    // ── Basic Arithmetic ─────────────────────────────────────────────────────

    /// <summary>Add two numbers: a + b</summary>
    [HttpPost("add")]
    public ActionResult<CalculatorResult> Add(BinaryRequest req) =>
        Respond(calculator.Add(req.A, req.B));

    /// <summary>Subtract two numbers: a - b</summary>
    [HttpPost("subtract")]
    public ActionResult<CalculatorResult> Subtract(BinaryRequest req) =>
        Respond(calculator.Subtract(req.A, req.B));

    /// <summary>Multiply two numbers: a × b</summary>
    [HttpPost("multiply")]
    public ActionResult<CalculatorResult> Multiply(BinaryRequest req) =>
        Respond(calculator.Multiply(req.A, req.B));

    /// <summary>Divide two numbers: a ÷ b</summary>
    [HttpPost("divide")]
    public ActionResult<CalculatorResult> Divide(BinaryRequest req) =>
        Respond(calculator.Divide(req.A, req.B));

    /// <summary>Remainder of a ÷ b</summary>
    [HttpPost("modulo")]
    public ActionResult<CalculatorResult> Modulo(BinaryRequest req) =>
        Respond(calculator.Modulo(req.A, req.B));

    /// <summary>Raise base to an exponent: base ^ exponent</summary>
    [HttpPost("power")]
    public ActionResult<CalculatorResult> Power(PowerRequest req) =>
        Respond(calculator.Power(req.Base, req.Exponent));

    // ── Unary Operations ─────────────────────────────────────────────────────

    /// <summary>Square root of x</summary>
    [HttpPost("sqrt")]
    public ActionResult<CalculatorResult> Sqrt(UnaryRequest req) =>
        Respond(calculator.Sqrt(req.X));

    /// <summary>Square of x (x²)</summary>
    [HttpPost("square")]
    public ActionResult<CalculatorResult> Square(UnaryRequest req) =>
        Respond(calculator.Square(req.X));

    /// <summary>Absolute value of x</summary>
    [HttpPost("abs")]
    public ActionResult<CalculatorResult> Abs(UnaryRequest req) =>
        Respond(calculator.Abs(req.X));

    /// <summary>Negate x (-x)</summary>
    [HttpPost("negate")]
    public ActionResult<CalculatorResult> Negate(UnaryRequest req) =>
        Respond(calculator.Negate(req.X));

    /// <summary>Convert x to a percentage (x / 100)</summary>
    [HttpPost("percent")]
    public ActionResult<CalculatorResult> Percent(UnaryRequest req) =>
        Respond(calculator.Percent(req.X));

    /// <summary>Reciprocal of x (1 / x)</summary>
    [HttpPost("reciprocal")]
    public ActionResult<CalculatorResult> Reciprocal(UnaryRequest req) =>
        Respond(calculator.Reciprocal(req.X));

    // ── Logarithms ───────────────────────────────────────────────────────────

    /// <summary>Base-10 logarithm of x</summary>
    [HttpPost("log")]
    public ActionResult<CalculatorResult> Log(UnaryRequest req) =>
        Respond(calculator.Log10(req.X));

    /// <summary>Natural logarithm (base e) of x</summary>
    [HttpPost("ln")]
    public ActionResult<CalculatorResult> Ln(UnaryRequest req) =>
        Respond(calculator.Ln(req.X));

    /// <summary>Logarithm of x in a custom base</summary>
    [HttpPost("log-base")]
    public ActionResult<CalculatorResult> LogBase([FromBody] LogBaseRequest req) =>
        Respond(calculator.LogBase(req.X, req.Base));

    // ── Trigonometry ─────────────────────────────────────────────────────────

    /// <summary>Sine of x (mode: Deg or Rad)</summary>
    [HttpPost("sin")]
    public ActionResult<CalculatorResult> Sin(UnaryRequest req) =>
        Respond(calculator.Sin(req.X, req.Mode));

    /// <summary>Cosine of x (mode: Deg or Rad)</summary>
    [HttpPost("cos")]
    public ActionResult<CalculatorResult> Cos(UnaryRequest req) =>
        Respond(calculator.Cos(req.X, req.Mode));

    /// <summary>Tangent of x (mode: Deg or Rad)</summary>
    [HttpPost("tan")]
    public ActionResult<CalculatorResult> Tan(UnaryRequest req) =>
        Respond(calculator.Tan(req.X, req.Mode));

    /// <summary>Arcsine of x, result in Deg or Rad</summary>
    [HttpPost("asin")]
    public ActionResult<CalculatorResult> Asin(UnaryRequest req) =>
        Respond(calculator.Asin(req.X, req.Mode));

    /// <summary>Arccosine of x, result in Deg or Rad</summary>
    [HttpPost("acos")]
    public ActionResult<CalculatorResult> Acos(UnaryRequest req) =>
        Respond(calculator.Acos(req.X, req.Mode));

    /// <summary>Arctangent of x, result in Deg or Rad</summary>
    [HttpPost("atan")]
    public ActionResult<CalculatorResult> Atan(UnaryRequest req) =>
        Respond(calculator.Atan(req.X, req.Mode));

    // ── Helper ───────────────────────────────────────────────────────────────

    private ActionResult<CalculatorResult> Respond(CalculatorResult result) =>
        result.Success ? Ok(result) : BadRequest(result);
}

public record LogBaseRequest(double X, double Base);
