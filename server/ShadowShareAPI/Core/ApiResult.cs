using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ShadowShareAPI.Core;

public class ApiResult : IActionResult
{
    [JsonPropertyOrder(0)]
    public bool IsSuccess { get; set; }

    [JsonPropertyOrder(1)]
    public int StatusCode { get; set; }

    [JsonPropertyOrder(2)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Message { get; set; }

    public ApiResult(bool isSuccess, int statusCode, string? message = null)
    {
        IsSuccess = isSuccess;
        StatusCode = statusCode;
        Message = message;
    }

    public static ApiResult Ok() => new(true, 200, "Operation successful");
    public static ApiResult Created() => new(true, 201, "Resource created successfully");
    public static ApiResult Accepted() => new(true, 202, "Request accepted and processing in progress");
    public static ApiResult NoContent() => new(true, 204, "No content available");
    public static ApiResult BadRequest(string? message = null) => new(false, 400, message ?? "Bad request, please check your input");
    public static ApiResult Unauthorized(string? message = null) => new(false, 401, message ?? "Unauthorized, authentication required");
    public static ApiResult Forbidden(string? message = null) => new(false, 403, message ?? "Forbidden, access denied");
    public static ApiResult NotFound(string? message = null) => new(false, 404, message ?? "Requested resource not found");
    public static ApiResult Conflict(string? message = null) => new(false, 409, message ?? "Conflict, the request could not be completed due to a conflict with the current state of the target resource");
    public static ApiResult InternalServerError(string? message = null) => new(false, 500, message ?? "Internal server error occurred");

    public Task ExecuteResultAsync(ActionContext context)
    {
        JsonResult result = new(this);
        result.StatusCode = StatusCode;
        return result.ExecuteResultAsync(context);
    }
}


public class ApiResult<TData> : ApiResult where TData : class
{
    [JsonPropertyOrder(4)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public TData? Data { get; set; }

    public ApiResult(bool isSuccess, int statusCode, TData? data, string? message = null)
        : base(isSuccess, statusCode, message)
    {
        Data = data;
    }

    public static ApiResult<TData> Ok(TData data) => new(true, 200, data, "Operation successful");
    public static ApiResult<TData> Created(TData data) => new(true, 201, data, "Resource created successfully");
}
