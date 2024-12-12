    <?php

    // namespace App\Http\Controllers;

    use App\Models\YearLevel;  // Import the YearLevel model
    use Illuminate\Http\Request;

    class YearLevelController extends Controller
    {
        public function index()
        {
            return response()->json(YearLevel::all());  // Fetch all year levels
        }

        public function store(Request $request)
        {
            $request->validate([
                'year_level' => 'required|string|unique:year_level|max:255',
            ]);

            $yearLevel = YearLevel::create([
                'year_level' => $request->year_level,
            ]);

            return response()->json($yearLevel, 201);  // Return the created record
        }

        public function show($id)
        {
            $yearLevel = YearLevel::findOrFail($id);
            return response()->json($yearLevel);  // Return the specific year level
        }

        public function update(Request $request, $id)
        {
            $request->validate([
                'year_level' => 'required|string|max:255|unique:year_level,year_level,' . $id,
            ]);

            $yearLevel = YearLevel::findOrFail($id);
            $yearLevel->update([
                'year_level' => $request->year_level,
            ]);

            return response()->json($yearLevel);  // Return the updated record
        }

        public function destroy($id)
        {
            $yearLevel = YearLevel::findOrFail($id);
            $yearLevel->delete();

            return response()->json(null, 204);  // Return no content after delete
        }
    }
