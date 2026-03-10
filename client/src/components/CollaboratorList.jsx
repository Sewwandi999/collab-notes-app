export default function CollaboratorList({
  collaborators = [],
  onRemove,
  isOwner,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-slate-900">Collaborators</h3>

      {collaborators.length === 0 ? (
        <p className="text-slate-500">No collaborators added yet.</p>
      ) : (
        <div className="space-y-3">
          {collaborators.map((person) => (
            <div
              key={person._id}
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
            >
              <div>
                <p className="font-semibold text-slate-900">{person.name}</p>
                <p className="text-sm text-slate-500">{person.email}</p>
              </div>

              {isOwner && (
                <button
                  onClick={() => onRemove(person._id)}
                  className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}