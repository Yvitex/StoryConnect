using Microsoft.AspNetCore.Identity;

namespace StoryConnectBackend.Models;

public class Story
{
    public Guid Id { get; set; }
    public string OwnerId { get; set; } = string.Empty;
    public string Title { get; set; } = "Untitled story";
    public string? Description { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }

    public IdentityUser? Owner { get; set; }
    public ICollection<NodeType> NodeTypes { get; set; } = [];
    public ICollection<Node> Nodes { get; set; } = [];
    public ICollection<RelationshipType> RelationshipTypes { get; set; } = [];
    public ICollection<Edge> Edges { get; set; } = [];
}
