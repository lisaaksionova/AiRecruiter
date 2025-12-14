using System.Reflection;

namespace AiRecruiter.BLL;

public static class AssemblyReference
{
    public static readonly Assembly  Assembly = typeof(AssemblyReference).Assembly;
}