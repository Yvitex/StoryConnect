namespace StoryConnectBackend.Models;

public class Node
{
    public Guid Id { get; set; }
    public Guid StoryId { get; set; }
    public Guid TypeId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Summary { get; set; }

    public string? Notes { get; set; }

    public string? NotesText { get; set; }

    public string Properties { get; set; } = "{}";

    public float? X { get; set; }
    public float? Y { get; set; }

    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    public Story? Story { get; set; }
    public NodeType? Type { get; set; }
    public ICollection<Edge> OutgoingEdges { get; set; } = [];
    public ICollection<Edge> IncomingEdges { get; set; } = [];
    public ICollection<NodeMention> Mentions { get; set; } = [];
    public ICollection<NodeMention> MentionedBy { get; set; } = [];
}
