import HistoryListItem from "../HistoryListItem";

export default function HistoryListItemExample() {
  const mockItems = [
    {
      id: "1",
      date: "Today, 2:30 PM",
      duration: "3:45",
      preview:
        "This is a sample transcription from today discussing the implementation of voice features...",
    },
    {
      id: "2",
      date: "Yesterday, 10:15 AM",
      duration: "2:12",
      preview: "Meeting notes about project planning and AI integration strategies...",
    },
    {
      id: "3",
      date: "Nov 1, 2025",
      duration: "5:30",
      preview: "Interview transcription covering multiple topics including technology trends...",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-6">Recording History</h2>
        {mockItems.map((item) => (
          <HistoryListItem
            key={item.id}
            {...item}
            onClick={(id) => console.log("Clicked item:", id)}
            onDelete={(id) => console.log("Delete item:", id)}
            onShare={(id) => console.log("Share item:", id)}
          />
        ))}
      </div>
    </div>
  );
}
