namespace StoryConnectBackend.Models;

public class NodeType
{
    public Guid Id { get; set; }
    public Guid StoryId { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string? Icon { get; set; }

    public Story? Story { get; set; }
    public ICollection<Node> Nodes { get; set; } = [];
}
