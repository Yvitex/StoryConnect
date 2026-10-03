namespace StoryConnectBackend.Models;

public class RelationshipType
{
    public Guid Id { get; set; }
    public Guid StoryId { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string? InverseLabel { get; set; }
    public bool Directed { get; set; } = true;

    public Story? Story { get; set; }
    public ICollection<Edge> Edges { get; set; } = [];
}
