namespace StoryConnectBackend.Models;

public class Edge
{
    public Guid Id { get; set; }
    public Guid StoryId { get; set; }
    public Guid SourceId { get; set; }
    public Guid TargetId { get; set; }
    public Guid RelationshipTypeId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    public Story? Story { get; set; }
    public Node? Source { get; set; }
    public Node? Target { get; set; }
    public RelationshipType? RelationshipType { get; set; }
}
