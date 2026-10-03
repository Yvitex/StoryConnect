namespace StoryConnectBackend.Models;

public class NodeMention
{
    public Guid StoryId { get; set; }
    public Guid SourceNodeId { get; set; }
    public Guid TargetNodeId { get; set; }

    public Story? Story { get; set; }
    public Node? SourceNode { get; set; }
    public Node? TargetNode { get; set; }
}
